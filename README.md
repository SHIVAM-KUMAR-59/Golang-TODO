# 🚀 Full-Stack TODO Application with Modern Go Architecture

What started as a simple TODO app evolved into a **comprehensive exploration of modern backend and frontend technologies**. This project served as my deep dive into industry-standard tools, architectural patterns, and the seamless integration between Go backends and Next.js frontends.

## 🎯 Why This Project Matters

While TODO apps might seem trivial, this implementation goes far beyond basic CRUD operations. It demonstrates:

- **Production-ready architecture** with clean separation of concerns
- **Type-safe communication** between frontend and backend
- **Modern tooling integration** that scales with real-world applications
- **Full-stack expertise** spanning Go microservices to React components

## 🛠️ Technology Deep Dive

### Backend Powerhouse (Go)

- **🔌 gRPC/ConnectRPC**: Learned how modern APIs can be both performant and developer-friendly
- **📋 Protobuf**: Mastered schema-first development and cross-language compatibility
- **🗃️ SQLC**: Experienced the power of compile-time SQL validation and type generation
- **🔄 Goose**: Implemented database versioning and migration strategies
- **🏗️ Clean Architecture**: Applied domain-driven design principles for maintainable code

### Frontend Innovation (Next.js)

- **🌐 ConnectRPC Integration**: Bridged the gap between gRPC services and modern web applications
- **⚡ Type-Safe APIs**: Leveraged generated TypeScript clients for seamless frontend-backend communication
- **🎨 Modern React Patterns**: Implemented hooks, context, and server components effectively

## 📁 Backend Architecture

```bash
server/
├── application/
│   ├── api/                            # gRPC API layer for handling requests
│   │   ├── grpcapi.go                  # Implementation of gRPC handlers
│   │   └── server.go                   # gRPC server setup and routing
│   ├── assert/
│   │   └── assert.go                   # Utility functions for assertions in tests
│   ├── errors/
│   │   └── errors.go                   # Custom error definitions and helpers
│   ├── logger/
│   │   └── loger.go                    # Logging setup and helpers
│   ├── models/
│   │   ├── pb/                         # Generated protobuf and gRPC code
│   │   │   ├── pbconnect/              # Generated ConnectRPC client/server code
│   │   │   ├── user.connect.go         # ConnectRPC Go code for User service
│   │   │   ├── user_grpc.pb.go         # gRPC Go code for User service
│   │   │   └── user.pb.go              # Core Go protobuf types for User service
│   │   └── user.proto                  # Protobuf definition for User service
│
├── service/                            # Business logic and domain services
│   ├── internal/
│   │   ├── repository/                 # Data access layer abstractions
│   │   │   ├── task/
│   │   │   │   └── mapper.go           # Mapper for mapping DB object to entity
│   │   │   │   └── taskRepository.go   # Task repository with DB queries
│   │   │   └── user/
│   │   │       └── userRepository.go   # User repository with DB queries
│   │   ├── module.go                   # Dependency injection setup for internal services
│   │   └── types.go                    # Shared internal types for repositories
│   ├── task/                           # Folder for task service
│   │   ├── task.go                     # Buisness logic for task
│   ├── types/
│   │   ├── entity/
│   │   │   ├── task.go                 # Domain entity definition for Task
│   │   │   └── user.go                 # Domain entity definition for User
│   ├── user/                           # Folder for user service
│   │   ├── service.go                  # Buisness logic for user
│   ├── service.go                      # Business logic service definitions
│   └── module.go                       # Dependency injection for services
│
├── config/
│   └── config.go                       # Application configuration loading
│
├── infra/
│   └── database/
│       └── postgres/
│           ├── gen/                    # Generated code from SQLC
│           │   ├── db.go               # SQLC database interfaces
│           │   ├── models.go           # Models generated by SQLC
│           │   ├── task.sql.go         # Go code for task SQL queries
│           │   └── user.sql.go         # Go code for user SQL queries
│           ├── migrations/             # SQL migrations for Postgres
│           │   └── 0001_tables.sql     # Migration script to create tables
│           │   └── migrate.go          # Migration code to run when server starts
│           ├── queries/                # Raw SQL query files for SQLC
│           │   ├── task.sql            # SQL queries for tasks
│           │   └── user.sql            # SQL queries for users
│           └── connection.go           # Postgres connection setup
│
├── buf.gen.yaml                        # Buf code generation configuration
├── buf.yaml                            # Buf workspace config
├── config.yaml                         # Configuration in YAML format
├── go.mod                              # Go module definitions
├── go.sum                              # Go module dependency checksums
├── main.go                             # Main application entry point
├── makefile                            # Makefile for common tasks
└── sqlc.yaml                           # SQLC configuration file
```

## Architecture Overview

This project follows **Clean Architecture** principles with clear separation of concerns:

### Layers

1. **Application Layer** (`application/`)

   - **API**: gRPC handlers and server setup
   - **Models**: Generated protobuf and ConnectRPC code
   - **Infrastructure**: Logging, error handling, assertions

2. **Service Layer** (`service/`)

   - **Business Logic**: Core domain services for Task and User operations
   - **Entities**: Domain models representing business concepts
   - **Repository Interfaces**: Abstractions for data access

3. **Infrastructure Layer** (`infra/`)
   - **Database**: PostgreSQL connection and SQLC generated code
   - **Migrations**: SQL schema evolution
   - **Configuration**: YAML-based app configuration

## 🌟 Key Learning Outcomes

### Backend Mastery

- **Schema-First Development**: Used protobuf to define contracts before implementation
- **Type Safety at Scale**: Leveraged SQLC to eliminate runtime SQL errors
- **Clean Architecture**: Implemented proper separation between business logic and infrastructure
- **Modern Go Patterns**: Applied dependency injection, interfaces, and modular design

### Frontend Innovation

- **ConnectRPC in Next.js**: Successfully integrated gRPC-style APIs with modern React applications
- **Type-Safe Frontend**: Generated TypeScript clients from protobuf schemas for end-to-end type safety
- **Modern React Architecture**: Implemented server components, hooks, and context patterns effectively
- **Seamless API Integration**: Created smooth data flow between frontend components and backend services

### DevOps & Tooling

- **Database Migrations**: Managed schema evolution with Goose
- **Code Generation**: Automated repetitive code with protobuf and SQLC
- **Build Automation**: Created efficient development workflows with Make
- **Configuration Management**: Implemented environment-aware application setup

## 🔄 The Full-Stack Experience

This project provided hands-on experience with the complete development lifecycle:

1. **Schema Design**: Started with protobuf definitions for API contracts
2. **Backend Development**: Built robust Go services with clean architecture
3. **Database Design**: Created efficient PostgreSQL schemas with proper migrations
4. **Frontend Integration**: Connected Next.js applications to gRPC services via ConnectRPC
5. **Type Safety**: Maintained end-to-end type safety from database to UI components
6. **Testing & Validation**: Ensured reliability through comprehensive testing strategies

## 💡 Why This Approach Matters

This isn't just another TODO app—it's a **miniature representation of enterprise-grade software development**. The patterns, tools, and architectural decisions mirror those used in production systems at scale, making it an invaluable learning experience for modern full-stack development.

The combination of Go's performance and safety with Next.js's developer experience, all connected through type-safe APIs, represents the future of web application development.
