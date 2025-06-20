# --- Build stage ---
FROM golang:1.22 AS builder

WORKDIR /app

COPY . .

# Optional: ensure dependencies are clean
RUN go mod tidy

# Build the binary
RUN go build -o task-core

# --- Final stage (small & secure) ---
FROM alpine:latest

WORKDIR /app

# Copy binary from build stage
COPY --from=builder /app/task-core .

EXPOSE 8084

CMD ["./task-core"]
