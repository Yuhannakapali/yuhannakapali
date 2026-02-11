export const projects = [
  {
    // genecan
    id: "railsync",
    title: "RailSync Intermodal Terminal Operating System",
    description:
      "RailSync is a comprehensive terminal operating system designed to digitize and streamline the coordination of rail freight at intermodal terminals. By replacing fragmented manual processes with a centralized digital dashboard, the platform provides real-time visibility into train movements, slot planning, and terminal capacity.",
    tech: [
      "React",
      "TypeScript",
      "Tailwind",
      "Ant Design",
      "Node.js",
      "Express",
      "PostgreSQL",
      "WebSockets",
    ],
    image: "/railsync.png",
    github: "#",
    live: "https://www.railsync.app/",
    problem:
      "Intermodal terminals—where freight moves between trains and trucks—often suffer from operational opacity and communication bottlenecks. Terminal operators rely on fragmented spreadsheets, phone calls, and emails to coordinate train arrivals and departures. This leads to a lack of real-time visibility into delays or capacity conflicts and inefficient slot management causing congestion and reduced throughput.",
    technicalDescription:
      "Built as a web-based 'control tower' for terminal operations. The frontend uses React with TypeScript and Ant Design for a complex, interactive grid layout. The backend runs on Node.js with Express and PostgreSQL for handling complex relational data between trains, slots, and terminals. WebSockets power live updates on delays and slot changes. The system aggregates logistics data into an intuitive visual interface with a dynamic Kanban-style slot planner.",
    features: [
      "Dynamic scheduling grid with timeline-based resource allocation",
      "Visual Kanban-style slot planning by time and status (Clearance, Preplanning, Slot)",
      "Real-time exception handling with automatic disruption flagging",
      "Status workflow engine tracking train visits from Approaching to Clearance and Presentation",
      "Unified card view consolidating Inbound/Outbound counts, Sender/Receiver codes, and Rail Company data",
      "Alert system with prominent notification banners for critical operational delays",
      "Historical and daily information modules for audits and throughput tracking",
    ],
  },
  {
    id: "gemelli-indoor-nav",
    title: "Indoor Navigation System – Gemelli Policlinic",
    description:
      "A real-time indoor navigation system for Agostino Gemelli University Policlinic, one of the largest teaching hospitals in Italy. A 'Google Maps for Indoors' experience that uses a network of hardware beacons to guide patients and visitors through the hospital's complex, GPS-denied environment via their mobile devices.",
    tech: [
      "Node.js",
      "Socket.io",
      "Raspberry Pi Zero W",
      "Bluetooth Low Energy",
      "JavaScript",
    ],
    image: "/arianna.jpg",
    github: "#",
    live: "#",
    problem:
      "The Gemelli Policlinic is a sprawling facility with multiple wings, floors, and complex corridors where standard GPS signals are unreliable or non-existent. Patients often faced high anxiety and confusion trying to locate specific departments, leading to missed appointments and operational inefficiencies for staff who frequently had to act as guides.",
    technicalDescription:
      "The system uses a custom indoor positioning architecture. Raspberry Pi Zero W units configured as BLE beacons are strategically placed throughout the facility, creating a signal grid. A Node.js backend manages the digital map of the hospital as a graph of nodes and edges, processing RSSI (signal strength) data to triangulate user position relative to nearby beacons. Socket.io provides bi-directional, low-latency communication between the mobile client and server for instantaneous position updates and dynamic pathfinding without page reloads.",
    features: [
      "Precision indoor positioning using Raspberry Pi Zero BLE beacons",
      "Turn-by-turn navigation instructions on mobile devices",
      "Dynamic pathfinding with automatic re-routing on wrong turns",
      "Dense beacon network with no dead zones in coverage",
      "Scalable Node.js backend handling hundreds of concurrent visitors",
      "Accessible, user-centric interface designed for elderly patients",
    ],
  },
];
