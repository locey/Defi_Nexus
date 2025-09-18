### 后端代码库
### 项目目录结构

    nexus-backend/
    ├── cmd/
    │   └── server/
    │       └── main.go          # 程序入口变得非常简洁，只负责启动
    │── common/                  # 公共文件
    ├── internal/                # 内部代码，禁止被外部项目导入（Go 1.4+ 特性）
    │   ├── controllers/         # 控制器层，处理HTTP请求响应
    │   │   └── user_controller.go
    │   ├── services/           # 服务层，核心业务逻辑在这里
    │   │   └── user_service.go
    │   ├── repositories/        # 仓储层，负责直接与数据库交互
    │   │   └── user_repository.go
    │   ├── models/             # 模型/实体定义
    │   │   └── user.go
    │   ├── middleware/         # 中间件
    │   │   └── jwt_auth.go
    │   └── pkg/                # 可供外部导入的公共代码（如工具函数、客户端）
    │       ├── auth/
    │       ├── database/
    │       └── response/
    ├── configs/                # 配置文件
    │   └── config.yaml
    ├── deployments/            # 部署相关文件（Dockerfile, k8s yaml）
    │   └── Dockerfile
    ├── tests/                  # 额外的测试代码
    ├── scripts/                # 脚本文件
    ├── go.mod
    └── go.sum


### 技术栈
golang 1.23  
gin 1.10   
mysql 8.0  
redis 7.2  
kafka 3.7

