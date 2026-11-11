export interface ReleaseInfo {
  version: string;
  tag: string;
  date: string;
  fileName: string;
  downloadUrl: string;
  fileSize: string;
  sha256: string;
  minAndroid: string;
  targetArchitecture: string;
  testedGameVersion: string;
  lsposedVersion: string;
  applicationId: string;
  downloadsCount: string;
  changelog: string[];
}

export const CURRENT_RELEASE: ReleaseInfo = {
  version: "2.0.0",
  tag: "v2.0.0-release",
  date: "November 9, 2026",
  fileName: "PokeSphere.apk",
  downloadUrl: "/downloads/PokeSphere.apk",
  fileSize: "21.6 MB",
  sha256: "3CEB9A6E3DD13235F0CC687005A89A5CE51CA01B7DD509AF0CB0BA83D92A4FFB",
  minAndroid: "Android 10 (API 29) to Android 15",
  targetArchitecture: "ARM64-v8a",
  testedGameVersion: "Pokémon GO 0.345.x - 0.355.x",
  lsposedVersion: "LSPosed v1.9.2+ (Zygisk)",
  applicationId: "dev.pgsphere",
  downloadsCount: "12,480+",
  changelog: [
    "Native Unity IL2CPP direct hook injection system",
    "Real-time 100% IV and PvP Rank overlay before catching",
    "Smart background Auto-Spin with inventory quota control",
    "Fast catch bypass with 100% curveball and accuracy assist",
    "Clean dark UI built with modern React Native & Kotlin backend",
    "Zero third-party telemetry, fully local memory manipulation"
  ]
};

export const FEATURES_LIST = [
  {
    id: "il2cpp-native",
    title: "IL2CPP C++ Native Engine",
    category: "Architecture",
    badge: "Native Core",
    description: "Operates directly in game memory via high-speed C++ hooks and LSPosed injection. Zero frame drops, zero screen-reader delays.",
    icon: "Cpu"
  },
  {
    id: "auto-spin",
    title: "Smart Auto-Spin PokéStops",
    category: "Automation",
    badge: "Step 2",
    description: "Automatically spins nearby PokéStops and Gym disks with randomized human-like intervals and auto-pause when bag is full.",
    icon: "RotateCw"
  },
  {
    id: "iv-scanner",
    title: "Instant IV & PvP League Scanner",
    category: "Combat & Stats",
    badge: "Step 3",
    description: "Calculates precise Attack/Defense/Stamina IV stats and Great/Ultra League rankings the millisecond an encounter triggers.",
    icon: "Scan"
  },
  {
    id: "fast-catch",
    title: "Precision Fast Catch Assist",
    category: "Capture",
    badge: "Step 4",
    description: "Skip tedious catch animations with customizable ball prioritization, automatic berry feeding, and curveball trajectory.",
    icon: "Target"
  },
  {
    id: "inventory-manager",
    title: "Smart Inventory & Transfer Filter",
    category: "Bag Management",
    badge: "Step 5",
    description: "Automate item purging (Potions, Nanab berries) and preview bulk transfers with safety lock on shiny and 100% IV Pokémon.",
    icon: "PackageCheck"
  },
  {
    id: "stealth-mode",
    title: "Isolated Sandbox & Stealth",
    category: "Security",
    badge: "Safe Design",
    description: "Runs purely in memory without modifying the original APK signature. Scope is locked strictly to the target Pokémon GO process.",
    icon: "ShieldCheck"
  }
];

export const INSTALL_STEPS = [
  {
    step: "01",
    title: "Verify Root & LSPosed",
    summary: "Ensure your Android phone is rooted with Magisk, KernelSU, or APatch and has Zygisk-LSPosed active.",
    details: "Open LSPosed Manager app and make sure the framework shows 'System framework is active'.",
    badge: "Prerequisite"
  },
  {
    step: "02",
    title: "Download & Install PokeSphere APK",
    summary: "Download the latest PokeSphere ARM64 release package and install it on your device.",
    details: "Allow installation from unknown sources in your browser or file manager.",
    badge: "Installation"
  },
  {
    step: "03",
    title: "Enable Module in LSPosed",
    summary: "Open LSPosed, navigate to the Modules tab, toggle PokeSphere ON, and select target 'Pokémon GO'.",
    details: "Target package: com.nianticlabs.pokemongo. Rebooting device is recommended after first enable.",
    badge: "Configuration"
  },
  {
    step: "04",
    title: "Launch & Customize",
    summary: "Open PokeSphere to configure features, then launch Pokémon GO. The overlay HUD will hook seamlessly.",
    details: "Features can be toggled in real-time. Start with features disabled and enable one by one.",
    badge: "Ready to Play"
  }
];

export const FAQS = [
  {
    q: "Do I need a rooted phone to run PokeSphere?",
    a: "Yes. PokeSphere relies on the LSPosed Zygisk framework to inject into the game's Unity process. You will need a rooted device running Magisk, KernelSU, or APatch."
  },
  {
    q: "Can I use PokeSphere on my main account?",
    a: "No! PokeSphere is strictly an educational reverse-engineering project. As stated in our guidelines, always test on a spare burner account. Any third-party game modification carries account risk."
  },
  {
    q: "Does PokeSphere modify the original Pokémon GO APK?",
    a: "No. PokeSphere leaves the original Pokémon GO APK completely unmodified and untouched with its official Play Store signature. All functions operate via dynamic runtime hooks."
  },
  {
    q: "Which Android versions and architectures are supported?",
    a: "PokeSphere is optimized for 64-bit devices (ARM64-v8a) running Android 10, 11, 12, 13, 14, and 15. 32-bit (armeabi-v7a) is not supported."
  },
  {
    q: "How do I update PokeSphere when a new version drops?",
    a: "Simply download the updated APK and install it over your existing PokeSphere app. Your configured preferences will be preserved."
  }
];
