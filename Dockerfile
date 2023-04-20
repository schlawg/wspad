FROM erlang:25.3-alpine

RUN mkdir /build
WORKDIR /build

COPY . wspad

WORKDIR wspad
RUN rebar3 as prod release

FROM alpine

RUN apk add --no-cache openssl && \
    apk add --no-cache ncurses-libs && \
    apk add --no-cache libstdc++

COPY --from=0 /build/wspad/_build/prod/rel/wspad /wspad

RUN mkdir -p /wspad/lib/wspad-0.0.1/priv/db
RUN ln -s /wspad/lib/wspad-0.0.1/priv/db /db

VOLUME /db

EXPOSE 8080

CMD ["/wspad/bin/wspad","foreground"]
