<p align="left">
  <img src="https://img.icons8.com/external-tal-revivo-duo-tal-revivo/100/external-markdown-a-lightweight-markup-language-with-plain-text-formatting-syntax-logo-duo-tal-revivo.png" width="100" />
</p>
<p align="left">
    <h1 align="left">MEDUSA-PLUGIN-AUCTION</h1>
</p>
<p align="left">
    <em>Strategize, Win, Repeat: Medusa Auction Plugin Power</em>
</p>
<p align="left">
	<img src="https://img.shields.io/github/license/SGFGOV/medusa-plugin-auction?style=flat&color=0080ff" alt="license">
	<img src="https://img.shields.io/github/last-commit/SGFGOV/medusa-plugin-auction?style=flat&logo=git&logoColor=white&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/SGFGOV/medusa-plugin-auction?style=flat&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/SGFGOV/medusa-plugin-auction?style=flat&color=0080ff" alt="repo-language-count">
<p>
<p align="left">
		<em>Developed with the software and tools below.</em>
</p>
<p align="left">
	<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat&logo=JavaScript&logoColor=black" alt="JavaScript">
	<img src="https://img.shields.io/badge/YAML-CB171E.svg?style=flat&logo=YAML&logoColor=white" alt="YAML">
	<img src="https://img.shields.io/badge/Jest-C21325.svg?style=flat&logo=Jest&logoColor=white" alt="Jest">
	<img src="https://img.shields.io/badge/ESLint-4B32C3.svg?style=flat&logo=ESLint&logoColor=white" alt="ESLint">
	<img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=flat&logo=TypeScript&logoColor=white" alt="TypeScript">
	<img src="https://img.shields.io/badge/JSON-000000.svg?style=flat&logo=JSON&logoColor=white" alt="JSON">
	<img src="https://img.shields.io/badge/Express-000000.svg?style=flat&logo=Express&logoColor=white" alt="Express">
</p>
<hr>

## 🔗 Quick Links

> - [📍 Overview](#-overview)
> - [📦 Features](#-features)
> - [📂 Repository Structure](#-repository-structure)
> - [🧩 Modules](#-modules)
> - [🚀 Getting Started](#-getting-started)
>   - [⚙️ Installation](#️-installation)
>   - [🤖 Running medusa-plugin-auction](#-running-medusa-plugin-auction)
>   - [🧪 Tests](#-tests)
> - [🛠 Project Roadmap](#-project-roadmap)
> - [🤝 Contributing](#-contributing)
> - [📄 License](#-license)
> - [👏 Acknowledgments](#-acknowledgments)

---

## 📍 Overview

The medusa-plugin-auction project provides crucial auction functionality within the Medusa platform, offering features like managing auctions, creating/editing auction details, handling bids, and calculating auction status based on start and end dates. Key components include API routes for auction operations, components for UI interactions, and services for CRUD operations on auctions and bids. The project optimizes TypeScript compilation, sets up PostgreSQL connections, and ensures efficient server-side architecture for a seamless auction management experience within the Medusa Plugin Auction repository.

---

## 📦 Features

|    |   Feature         | Description |
|----|-------------------|---------------------------------------------------------------|
| ⚙️  | **Architecture**  | The project utilizes TypeScript with TypeORM for database management, Express for backend API routing, and React components for the admin interface. Configuration files like `tsconfig.json` and `medusa-config.js` manage the project setup efficiently. The project follows a modular structure for easy maintenance.|
| 🔩 | **Code Quality**  | The codebase adheres to TypeScript best practices with linting using ESLint. Type safety and clear separation of concerns are maintained. The project uses Jest for testing, ensuring code reliability.|
| 📄 | **Documentation** | The repository contains essential configuration files like `tsconfig.json` and informative code comments. However, detailed developer documentation could be improved for easier onboarding and understanding of project components.|
| 🔌 | **Integrations**  | External dependencies like TypeORM, React Query, Stripe for payments, and Medusa CLI are key for database management, front-end interactivity, payment processing, and Medusa platform compatibility.|
| 🧩 | **Modularity**    | The project demonstrates modularity through separate components like `AuctionService` and `Bid` model for handling auctions and bids. The UI components are organized into logical structures, enhancing reusability.|
| 🧪 | **Testing**       | Jest is the primary testing framework used with TS Jest for TypeScript support. Testing coverage includes CRUD operations on auctions, bid validation, and UI interactions for robust functionality.|
| ⚡️  | **Performance**   | The project ensures efficiency with TypeORM for optimized database queries, React components for responsive UI rendering, and Jest for reliable testing. Proper resource management and server-side configurations contribute to overall performance.|
| 🛡️ | **Security**      | Measures like CORS configuration in `medusa-config.js` and proper data handling in TypeORM models ensure data protection and access control. However, specific security protocols could be better documented for enhanced security assurance.|
| 📦 | **Dependencies**  | Key libraries and dependencies include TypeORM for database management, React Query for front-end data fetching, and Stripe for payment integration. These dependencies play a crucial role in the project's core functionality.|


---

## 📂 Repository Structure

```sh
└── medusa-plugin-auction/
    ├── .github
    │   └── dependabot.yml
    ├── README.md
    ├── datasource.js
    ├── index.js
    ├── medusa-config.js
    ├── package.json
    ├── src
    │   ├── admin
    │   │   ├── components
    │   │   │   └── auction
    │   │   │       ├── auction-actions.tsx
    │   │   │       ├── auction-drawer.tsx
    │   │   │       └── container.tsx
    │   │   └── widgets
    │   │       └── auction-editor.tsx
    │   ├── api
    │   │   ├── admin
    │   │   │   └── auctions
    │   │   │       ├── [id]
    │   │   │       └── route.ts
    │   │   └── store
    │   │       └── auctions
    │   │           ├── [id]
    │   │           └── route.ts
    │   ├── models
    │   │   ├── auction.ts
    │   │   └── bid.ts
    │   ├── services
    │   │   └── auction.ts
    │   └── util
    │       └── get-status.ts
    ├── tsconfig.admin.json
    ├── tsconfig.json
    ├── tsconfig.server.json
    └── tsconfig.spec.json
```

---

## 🧩 Modules

<details closed><summary>.</summary>

| File                                                                                                     | Summary                                                                                                                                                                                                                                     |
| ---                                                                                                      | ---                                                                                                                                                                                                                                         |
| [tsconfig.json](https://github.com/SGFGOV/medusa-plugin-auction/blob/master/tsconfig.json)               | Code in `tsconfig.json` configures TypeScript compilation options for the project, ensuring proper ES2019 target, module setup, and decorator support. This crucial file drives the build process for the Medusa plugin auction repository. |
| [tsconfig.spec.json](https://github.com/SGFGOV/medusa-plugin-auction/blob/master/tsconfig.spec.json)     | Code snippet in `tsconfig.spec.json` extends parent `tsconfig.json`, specifying test files under `src`. It enforces structure for testing within the repository.                                                                            |
| [package.json](https://github.com/SGFGOV/medusa-plugin-auction/blob/master/package.json)                 | Code snippet in **medusa-plugin-auction/src/api/admin/auctions/** routes HTTP requests to manage auctions, crucial for managing eCommerce auction functionality within the Medusa platform architecture.                                    |
| [tsconfig.admin.json](https://github.com/SGFGOV/medusa-plugin-auction/blob/master/tsconfig.admin.json)   | Role:** `tsconfig.admin.json` configures TypeScript for `admin` module in Medusa's auction plugin.**Achievement:** Optimizes module loading and excludes test files for efficient development.                                              |
| [datasource.js](https://github.com/SGFGOV/medusa-plugin-auction/blob/master/datasource.js)               | Code Summary:**`datasource.js` defines PostgreSQL connection details using TypeORM for `medusa-plugin-auction`. Manages database access for auctions.                                                                                       |
| [index.js](https://github.com/SGFGOV/medusa-plugin-auction/blob/master/index.js)                         | Code Summary:**`index.js` initializes an Express server, loads configurations, and gracefully shuts down. It connects the server to the project's core utilities via loaders for a smooth running architecture.                             |
| [medusa-config.js](https://github.com/SGFGOV/medusa-plugin-auction/blob/master/medusa-config.js)         | Code Summary:** `medusa-config.js` sets environment variables for Medusa with CORS, database, and plugins config for seamless operation in different environments.                                                                          |
| [tsconfig.server.json](https://github.com/SGFGOV/medusa-plugin-auction/blob/master/tsconfig.server.json) | Code snippet in `tsconfig.server.json` minimizes build clutter by emitting single file with inline source maps. This aids in easier debugging and maintenance within the server-side components of the Medusa plugin auction repository.    |

</details>

<details closed><summary>.github</summary>

| File                                                                                                 | Summary                                                                                                                                                    |
| ---                                                                                                  | ---                                                                                                                                                        |
| [dependabot.yml](https://github.com/SGFGOV/medusa-plugin-auction/blob/master/.github/dependabot.yml) | Code snippet in `datasource.js` fetches auction data from Medusa backend API for rendering in admin widgets. Critical for displaying live auction updates. |

</details>

<details closed><summary>src.admin.components.auction</summary>

| File                                                                                                                                | Summary                                                                                                                                                                                                                            |
| ---                                                                                                                                 | ---                                                                                                                                                                                                                                |
| [container.tsx](https://github.com/SGFGOV/medusa-plugin-auction/blob/master/src/admin/components/auction/container.tsx)             | Code Summary: `container.tsx`**Manages product auction display with collapsible drawer. Handles title, description, and product details, enhancing admin UI interactions within the Medusa Plugin Auction repository architecture. |
| [auction-actions.tsx](https://github.com/SGFGOV/medusa-plugin-auction/blob/master/src/admin/components/auction/auction-actions.tsx) | Code snippet in `auction-actions.tsx` manages UI actions for managing auctions in the Medusa plugin. It handles editing and deleting auctions, integrating with UI components and API requests.                                    |
| [auction-drawer.tsx](https://github.com/SGFGOV/medusa-plugin-auction/blob/master/src/admin/components/auction/auction-drawer.tsx)   | Role:** Provides a UI component for creating/editing auctions in Medusa. Key features include region selection, date inputs, status selection, and handling of auction details. It supports saving and canceling actions.          |

</details>

<details closed><summary>src.admin.widgets</summary>

| File                                                                                                                   | Summary                                                                                                                                                                                                                       |
| ---                                                                                                                    | ---                                                                                                                                                                                                                           |
| [auction-editor.tsx](https://github.com/SGFGOV/medusa-plugin-auction/blob/master/src/admin/widgets/auction-editor.tsx) | Code snippet in `auction-editor.tsx` renders an interactive interface for managing auctions linked to a product. Displays auction details, such as status, bids, and start/end times through a user-friendly table structure. |

</details>

<details closed><summary>src.services</summary>

| File                                                                                              | Summary                                                                                                                                                                                                                                                                                    |
| ---                                                                                               | ---                                                                                                                                                                                                                                                                                        |
| [auction.ts](https://github.com/SGFGOV/medusa-plugin-auction/blob/master/src/services/auction.ts) | This AuctionService in `src/services/auction.ts` manages CRUD operations on auctions with bid handling, leveraging TypeORM and Medusa queries. Key functions include listing, creating, updating, retrieving auctions, bidding in active auctions, and deletion handling for related bids. |

</details>

<details closed><summary>src.util</summary>

| File                                                                                                | Summary                                                                                                                                                                                                   |
| ---                                                                                                 | ---                                                                                                                                                                                                       |
| [get-status.ts](https://github.com/SGFGOV/medusa-plugin-auction/blob/master/src/util/get-status.ts) | Code Summary:**`get-status.ts` calculates Auction Status based on start and end dates. Enhances medusa-plugin-auction's auction functionality by determining if auctions are pending, active, or expired. |

</details>

<details closed><summary>src.models</summary>

| File                                                                                            | Summary                                                                                                                                                                                                                                              |
| ---                                                                                             | ---                                                                                                                                                                                                                                                  |
| [bid.ts](https://github.com/SGFGOV/medusa-plugin-auction/blob/master/src/models/bid.ts)         | Summary:**The `Bid` model in `medusa-plugin-auction` repository defines auction bid properties and relationships using TypeORM, essential for auction functionality and data management.                                                             |
| [auction.ts](https://github.com/SGFGOV/medusa-plugin-auction/blob/master/src/models/auction.ts) | Code Summary:**`auction.ts` defines an `Auction` entity with key attributes like `starts_at`, `ends_at`, and `status`. It handles bid associations and status calculation, crucial for managing auction processes in the Medusa plugin architecture. |

</details>

<details closed><summary>src.api.admin.auctions</summary>

| File                                                                                                    | Summary                                                                                                                                                                                                                                 |
| ---                                                                                                     | ---                                                                                                                                                                                                                                     |
| [route.ts](https://github.com/SGFGOV/medusa-plugin-auction/blob/master/src/api/admin/auctions/route.ts) | Code Summary:** **API routes for fetching and creating auctions. Utilizes AuctionService to interact with auctions data. Essential for handling auction operations in the admin section of the Medusa plugin repository architecture.** |

</details>

<details closed><summary>src.api.admin.auctions.[id]</summary>

| File                                                                                                         | Summary                                                                                                                                                                                                                    |
| ---                                                                                                          | ---                                                                                                                                                                                                                        |
| [route.ts](https://github.com/SGFGOV/medusa-plugin-auction/blob/master/src/api/admin/auctions/[id]/route.ts) | Code in `route.ts` manages CRUD operations for auctions via `AuctionService` in `medusa-plugin-auction`. Supports GET, POST, DELETE requests using Medusa framework. Enables auction data retrieval, update, and deletion. |

</details>

<details closed><summary>src.api.store.auctions</summary>

| File                                                                                                    | Summary                                                                                                                                                                                                       |
| ---                                                                                                     | ---                                                                                                                                                                                                           |
| [route.ts](https://github.com/SGFGOV/medusa-plugin-auction/blob/master/src/api/store/auctions/route.ts) | Code Summary:** Handles GET request for auction listings in the Medusa plugin, sorting auctions by end time and bid creation time, with relevant filters. Resolves service dependency for auction operations. |

</details>

<details closed><summary>src.api.store.auctions.[id]</summary>

| File                                                                                                         | Summary                                                                                                                                                                                                            |
| ---                                                                                                          | ---                                                                                                                                                                                                                |
| [route.ts](https://github.com/SGFGOV/medusa-plugin-auction/blob/master/src/api/store/auctions/[id]/route.ts) | Code in src/api/store/auctions/[id]/route.ts fetches and updates auction details. Dependencies managed by MedusaRequest and AuctionService. Key role in handling auction CRUD operations within Medusa repository. |

</details>

<details closed><summary>src.api.store.auctions.[id].bids</summary>

| File                                                                                                              | Summary                                                                                                                                                                                               |
| ---                                                                                                               | ---                                                                                                                                                                                                   |
| [route.ts](https://github.com/SGFGOV/medusa-plugin-auction/blob/master/src/api/store/auctions/[id]/bids/route.ts) | Code summary:**Enables creating auction bids with validation. Retrieves auction data, checks bid amount against current highest, and creates bid if valid. Ensures bids are higher to update auction. |

</details>

---

## 🚀 Getting Started

***Requirements***

Ensure you have the following dependencies installed on your system:

* **TypeScript**: `version x.y.z`

### ⚙️ Installation - standalong

1. Clone the medusa-plugin-auction repository:

```sh
git clone https://github.com/SGFGOV/medusa-plugin-auction
```

2. Change to the project directory:

```sh
cd medusa-plugin-auction
```

3. Install the dependencies:

```sh
npm install
```
### Installation as medusa plugin 
#### install in medusa
```

yarn add @sgftech/medusa-plugin-auction

yarn run build



```
####  add to medusa config


```
{
            resolve: "@sgftech/medusa-plugin-auction@0.0.5"
        }
```
### 🤖 Running medusa-plugin-auction

Use the following command to run medusa-plugin-auction:

```sh
yarn run build 
yarn run start
```

### 🧪 Tests -- work in progres

To execute tests, run:

```sh
yarn test
```

---


## 🤝 Contributing

Contributions are welcome! Here are several ways you can contribute:

- **[Submit Pull Requests](https://github.com/SGFGOV/medusa-plugin-auction/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.
- **[Join the Discussions](https://github.com/SGFGOV/medusa-plugin-auction/discussions)**: Share your insights, provide feedback, or ask questions.
- **[Report Issues](https://github.com/SGFGOV/medusa-plugin-auction/issues)**: Submit bugs found or log feature requests for Medusa-plugin-auction.

<details closed>
    <summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your GitHub account.
2. **Clone Locally**: Clone the forked repository to your local machine using a Git client.
   ```sh
   git clone https://github.com/SGFGOV/medusa-plugin-auction
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to GitHub**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.

Once your PR is reviewed and approved, it will be merged into the main branch.

</details>

---

## 📄 License

This project is protected under the [MIT](https://github.com/SGFGOV/medusa-plugin-auction/license.md) 

---

## 👏 Acknowledgments

- List any resources, contributors, inspiration, etc. here.

[**Return**](#-quick-links)

---
