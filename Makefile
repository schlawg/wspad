PROJECT = wspad
PROJECT_DESCRIPTION = New project
PROJECT_VERSION = 0.1.0

DEPS = cowboy
DEP_PLUGINS = cowboy

BUILD_DEPS += relx
include erlang.mk
