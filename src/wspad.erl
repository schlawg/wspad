-module(wspad).
-export([db_loc/0, db_loc/1]).
-export([asset/0, asset/1]).
-export([str/1]).

db_loc() ->
  case code:priv_dir(wspad) of
    {error, bad_name} ->
      error({badarg, "Can't resolve private dir of wspad"});
    Dir -> Dir ++ "/db"
  end.

db_loc(Name) -> if
  is_list(Name) ->
    db_loc() ++ Name;
  is_binary(Name) ->
    << (list_to_binary(db_loc()))/binary, "/", Name/binary >>;
  true ->
    error({badarg, "wtf is ~p", [Name]})
end.

asset() ->
  code:priv_dir(wspad).

asset(Name) -> if
  is_list(Name) ->
    asset() ++ "/" ++ Name;
  is_binary(Name) ->
    << (list_to_binary(asset()))/binary, "/", Name/binary >>;
  true ->
    error({badarg, "wtf is a ~p", [Name]})
end.

str(Data) -> unicode:characters_to_list(Data).