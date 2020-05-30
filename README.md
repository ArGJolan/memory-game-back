# Memory game back

## Build & Run

### With node

```shell
npm install
npm run watch
```

### With Docker

```shell
docker build -t memory-game-back .
docker run -d --name memory-game-back -p 1024:1024 -e NODE_ENV=development memory-game-back
```
