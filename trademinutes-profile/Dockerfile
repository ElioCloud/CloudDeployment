# Build stage
FROM golang:1.22 AS builder

WORKDIR /app
COPY . .

# Optional: tidy modules
RUN go mod tidy

# Build the Go binary
RUN go build -o profile

# Final lightweight image
FROM alpine:latest

WORKDIR /app

# Copy the binary from the builder stage
COPY --from=builder /app/profile .

# If needed, copy any other required static files (e.g., certs, templates)

EXPOSE 8081

CMD ["./profile"]
