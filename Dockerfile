FROM node:18-bullseye-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:/app/node_modules/.bin:$PATH"
RUN corepack disable && corepack enable
RUN mkdir /app && chown -R node:node /app
WORKDIR /app
USER node
COPY --chown=node:node client/package.json  ./client/
COPY --chown=node:node server/package.json ./server/
COPY --chown=node:node package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install -r --frozen-lockfile && \
	rm -rf ~/.pnpm-store;

FROM base AS dev-server
RUN pnpm install
CMD ["pnpm", "--filter", "@ditto/server", "dev"]

FROM base AS dev-client
RUN pnpm install
CMD ["pnpm", "--filter", "@ditto/client", "dev"]

FROM base AS build
COPY . .
RUN pnpm run build

# TODO: add test stage here

# this only has minimal deps and files
FROM base AS prod
COPY --from=build /app/dist/ .
CMD ["node", "index.js"]