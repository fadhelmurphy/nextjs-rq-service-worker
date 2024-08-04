

## Getting Started

### with docker

Build the project with docker image

```bash
docker build --no-cache -t next/rq-service-worker . --platform linux/amd64
```

Run the image

```bash
docker run -d -p 3000:3000 --name rq-service-worker next/rq-service-worker
```

### with package manager

Installation

``bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
