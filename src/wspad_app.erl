-module(wspad_app).
-behaviour(application).

-export([start/2]).
-export([stop/1]).

start(_Type, _Args) ->
	Dispatch = cowboy_router:compile([
		{'_', [
			{"/_ws/:path", ws_handler, []},
			{"/", index_handler, []},
		  {"/:path", pad_handler, []}
		]}
	]),
	{ok, _} = cowboy:start_http(http, 100, [{port, 8080}], [
		{env, [{dispatch, Dispatch}]}
	]),
  erlang:spawn(
    fun() ->
      global:register_name(app, self()),
      ets:new(socks, [bag, named_table]),
      ets:new(files, [ordered_set, named_table]),
      loop()
    end
  ),
  wspad_sup:start_link().

loop() ->
  receive
    {register, Name, WsPid} -> 
      logger:alert("registering {~p, ~p}", [Name, WsPid]),
      case ets:lookup(files, Name) of
        [] ->
          logger:alert("opening ~p", [wspad:db_loc(Name)]),
          case file:open(wspad:db_loc(Name),[read, write, binary, raw]) of
            {ok, PadFile} ->
              %file:datasync(PadFile),
              ets:insert(files, {Name, PadFile}),
              logger:alert("~p ~p ~p", [self(), WsPid, PadFile]),
              WsPid!{update, read(PadFile)};
            {error, Reason} ->
              logger:alert([Reason]),
              error(Reason)
            end;
        [{_, PadFile}|_] ->
          logger:alert("~p ~p ~p", [self(), WsPid, PadFile]),
          WsPid!{update, read(PadFile)}
      end,
      %logger:alert("registration presumed successful"),
      ets:insert(socks, {Name, WsPid});
    {updateAll, Name, Pad, SendingPid} -> 
      [{_, PadFile}|_] = ets:lookup(files, Name),
      write(PadFile, Pad),
      Pids = ets:lookup(socks, Name) -- [{Name, SendingPid}],
      lists:foreach(fun({_, Pid}) -> logger:alert("Updating ~p / ~p from ~p", [Name, Pid, SendingPid]) end, Pids),
      lists:foreach(fun({_, Pid}) -> update(Pid, Pad) end, Pids);
    {unregister, WsPid} ->
      logger:alert("unregistering ~p", [WsPid]),
      [Remove|_] = ets:match_object(socks, {'_', WsPid}),
      ets:delete_object(socks, Remove)
  end,
  loop().

update(Pid, Pad) ->
  Result = Pid!{update, Pad},
  logger:alert("~p", [Result]).

read(PadFile) ->
  file:position(PadFile, 0),
  %logger:alert("~p",[Seek]),
  case file:read(PadFile, 1024 * 1024) of
    {error, Reason} -> logger:alert("~p", [Reason]), atom_to_list(Reason);
    {ok, Pad} -> Pad;
    eof -> <<>>
  end.

write(PadFile, Pad) ->
  file:position(PadFile, 0),
  %logger:alert("writing: ~p", [PadFile]),
  case file:write(PadFile, Pad) of
    ok -> file:truncate(PadFile), file:datasync(PadFile);
    {error, Reason} -> logger:alert("~p", [Reason])%{error, Reason}
  end.

stop(_State) ->
	ok.
  