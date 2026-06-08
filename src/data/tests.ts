// Testing methodology pages served at /laptop/tests/{slug}.
export interface TestMethod {
  slug: string;
  title: string;
  summary: string;
  what: string[];
  how: string[];
  scoring: string;
  equipment: string[];
}

export const testMethods: TestMethod[] = [
  {
    slug: "display",
    title: "How We Test Laptop Displays",
    summary: "We measure brightness, contrast, colour gamut, colour accuracy, and flicker on every laptop display using a calibrated colorimeter.",
    what: ["Peak and sustained brightness (nits)", "Contrast ratio", "sRGB and DCI-P3 colour gamut", "Colour accuracy (Delta E)", "PWM flicker and reflections"],
    how: ["We run each panel at a fixed white point and measure with a calibrated colorimeter.", "Brightness is measured at full white; contrast uses full black on the same panel.", "Flicker is captured with an oscilloscope to detect PWM dimming."],
    scoring: "Display scores weight brightness, contrast, gamut, and accuracy. Creative use-case scores weight gamut and accuracy more heavily.",
    equipment: ["Calibrated colorimeter", "Photodiode + oscilloscope", "Controlled lighting"],
  },
  {
    slug: "battery",
    title: "How We Test Laptop Battery Life",
    summary: "We measure real battery life with web browsing and video playback at a fixed 150-nit brightness, so results are comparable across laptops.",
    what: ["Web browsing battery life", "Video playback battery life", "Productivity battery life", "Light gaming battery life", "Charge time to 80%"],
    how: ["We set every laptop to 150 nits and disable adaptive features.", "An automated script cycles through web pages and looping video until shutdown.", "Charge time is measured from 0 to 80% with the included charger."],
    scoring: "Battery scores are based on measured web and video runtime, not manufacturer claims.",
    equipment: ["Automated browsing script", "Power meter", "Fixed-brightness calibration"],
  },
  {
    slug: "performance",
    title: "How We Test Laptop Performance",
    summary: "We run a consistent suite of CPU, GPU, storage, and real-world workload tests to measure both peak and sustained performance.",
    what: ["Peak and sustained CPU performance", "GPU and gaming performance", "Storage read/write speeds", "Real-world export and compile workloads"],
    how: ["We run synthetic benchmarks plus a real 4K video export and a code-compile task.", "Sustained tests run long enough to surface thermal throttling.", "Each test runs multiple times and we report the median."],
    scoring: "Performance scores weight sustained results over short bursts, since real work runs longer than a benchmark.",
    equipment: ["Standardized benchmark suite", "Reference media project", "Thermal logging"],
  },
  {
    slug: "cpu",
    title: "How We Test Laptop CPUs",
    summary: "We measure single-core and multi-core performance, plus sustained output under prolonged load to capture throttling.",
    what: ["Single-core performance", "Multi-core performance", "Sustained multi-core under load", "Power draw"],
    how: ["We run Geekbench and Cinebench, then a 20-minute sustained loop.", "We log package power and clock speeds throughout."],
    scoring: "CPU contribution to the performance score weights sustained multi-core results most heavily.",
    equipment: ["Benchmark suite", "Power and clock logging"],
  },
  {
    slug: "gpu",
    title: "How We Test Laptop GPUs",
    summary: "We measure gaming frame rates across a fixed game suite and synthetic 3D benchmarks at 1080p and native resolution.",
    what: ["Average and 1% low frame rates", "Synthetic 3D benchmark scores", "Sustained GPU clocks and power"],
    how: ["We run a fixed set of games at preset settings and log frame times.", "We report average and 1% low FPS for each title."],
    scoring: "Gaming scores weight 1% lows and sustained frame rates, not just averages.",
    equipment: ["Fixed game suite", "Frame-time capture"],
  },
  {
    slug: "keyboard-touchpad",
    title: "How We Test Keyboards and Touchpads",
    summary: "We assess key travel, layout, backlighting, and typing comfort, plus touchpad size, tracking, and click quality.",
    what: ["Key travel and feedback", "Layout and backlight", "Touchpad size and material", "Tracking accuracy and click quality"],
    how: ["A reviewer completes a standardized typing test and notes layout issues.", "We measure key travel and test touchpad tracking with repeated gestures."],
    scoring: "Keyboard scores weight typing comfort and accuracy; touchpad quality is folded into the same category.",
    equipment: ["Typing test", "Calipers for key travel"],
  },
  {
    slug: "webcam-speakers-microphone",
    title: "How We Test Webcams, Speakers, and Microphones",
    summary: "We evaluate webcam resolution and low-light quality, speaker loudness and clarity, and microphone capture in quiet and noisy conditions.",
    what: ["Webcam resolution and low-light quality", "Speaker loudness and clarity", "Microphone capture quality", "Background noise rejection"],
    how: ["We capture reference video in bright and dim lighting.", "We measure speaker output and record microphone samples in a quiet and a noisy room."],
    scoring: "These feed the multimedia and working-from-home use-case scores.",
    equipment: ["Reference lighting", "SPL meter", "Standard audio test clips"],
  },
  {
    slug: "thermals-noise",
    title: "How We Test Thermals and Noise",
    summary: "We measure surface temperatures, internal CPU/GPU temperatures, and fan noise at idle and under sustained load.",
    what: ["Idle and load fan noise (dB)", "Keyboard and bottom surface temperatures", "CPU and GPU temperatures", "Thermal throttling behaviour"],
    how: ["We log temperatures and fan noise during a sustained stress test in a controlled room.", "Noise is measured at a fixed distance with an SPL meter."],
    scoring: "Thermals and noise scores weight surface comfort and sustained performance stability.",
    equipment: ["SPL meter", "Thermal camera", "Surface probes"],
  },
  {
    slug: "ports-connectivity",
    title: "How We Test Ports and Connectivity",
    summary: "We catalogue every port, verify charging and display output, and test Wi-Fi and Bluetooth stability.",
    what: ["Port selection and standards", "Charging and display output over USB-C", "Wi-Fi and Bluetooth version and stability"],
    how: ["We verify each port's real capabilities, not just its label.", "We test wireless throughput and stability at fixed distances."],
    scoring: "Ports scores weight versatility and the presence of charging/display-capable USB-C.",
    equipment: ["Reference docks and displays", "Wireless throughput tools"],
  },
  {
    slug: "build-quality",
    title: "How We Test Build Quality",
    summary: "We assess chassis rigidity, lid and deck flex, hinge feel, and materials to estimate long-term durability.",
    what: ["Chassis rigidity", "Lid and keyboard deck flex", "Hinge feel and stability", "Material quality"],
    how: ["We apply controlled pressure to the lid and deck and note flex.", "We open and close the hinge repeatedly to assess feel and wobble."],
    scoring: "Build quality scores weight rigidity and materials, which correlate with durability.",
    equipment: ["Controlled flex test", "Hinge cycling"],
  },
  {
    slug: "upgradeability",
    title: "How We Test Upgradeability and Repairability",
    summary: "We open each laptop to assess access to RAM, storage, and the battery, and how easily common parts can be replaced.",
    what: ["RAM access and type (soldered vs socketed)", "Storage access and slots", "Battery replaceability", "Repair difficulty"],
    how: ["We remove the bottom panel and document what is user-serviceable.", "We note tools required and any access barriers."],
    scoring: "Upgradeability scores reward socketed RAM, accessible storage, and replaceable batteries.",
    equipment: ["Standard toolkit", "Teardown documentation"],
  },
  {
    slug: "value",
    title: "How We Score Canadian Value",
    summary: "We compare each laptop's test performance against its real Canadian street price and availability, not just MSRP.",
    what: ["Performance per dollar in CAD", "Street price vs MSRP", "Retailer availability in Canada"],
    how: ["We track current prices across major Canadian retailers.", "Value is scored against the price you can actually pay, including common sale prices."],
    scoring: "Value scores rise when a laptop is frequently discounted below MSRP in Canada.",
    equipment: ["Canadian price tracking", "Retailer availability checks"],
  },
];

export function getTestMethod(slug: string): TestMethod | undefined {
  return testMethods.find((t) => t.slug === slug);
}

// Test Bench changelog versions for /laptop/tests/changelogs.
export const testBenches = [
  {
    version: "1.2",
    date: "2025-09-01",
    summary: "Current Test Bench. Added sustained creative-workload export tests and refined battery scoring.",
    changes: ["Added 4K video export workload to the performance suite", "Refined battery scoring to weight web and video equally", "Added PWM flicker measurement to display tests", "Retested all 2025 flagship laptops"],
    impact: "Creator-focused laptops gained slightly; thin laptops with weak sustained performance dropped a few tenths.",
  },
  {
    version: "1.1",
    date: "2025-03-15",
    summary: "Added repairability scoring and standardized fan-noise measurement distance.",
    changes: ["Introduced upgradeability/repairability score", "Standardized noise measurement at a fixed distance", "Added DCI-P3 gamut to display tests"],
    impact: "Easily serviceable laptops gained; sealed ultrabooks were largely unaffected.",
  },
  {
    version: "1.0",
    date: "2024-10-01",
    summary: "Initial public Test Bench covering display, performance, battery, keyboard, build, thermals, and ports.",
    changes: ["Established the 10-point weighted scoring system", "Defined core display, performance, and battery tests", "Set fixed 150-nit battery testing brightness"],
    impact: "Baseline methodology; all later versions are measured against this foundation.",
  },
];
