# Monte Carlo π Estimation with OpenMP (Educational Project)

A beginner-friendly project that demonstrates how the **Monte Carlo method** can estimate π, and how **parallel programming with OpenMP** can speed up the computation.

This repository now includes:
- A C/OpenMP implementation for local compilation and benchmarking.
- A polished static learning page (`index.html`) that explains the concept step by step.
- A `render.yaml` Blueprint so the educational site can be deployed quickly on Render.

---

## ✨ Features

- Monte Carlo π estimation in C.
- Both **sequential** and **parallel** execution paths.
- OpenMP-based reduction pattern for thread-safe accumulation.
- Runtime timing comparison between sequential and parallel versions.
- Beginner-focused static web UI with explanations, visuals, and a mini browser simulator.
- Render-ready static deployment config.

---

## 🧠 Concepts Covered

- Monte Carlo simulation basics
- Random sampling in 2D space
- Geometric probability for estimating π
- Sequential vs parallel execution
- OpenMP basics (`parallel`, `for`, `reduction`, thread IDs)
- Simple performance measurement in C

---

## 📁 Repository Structure

```text
.
├── monte_carlo_lab1.c   # C/OpenMP implementation for estimating π
├── index.html           # Educational front page
├── styles.css           # Front-end styling
├── script.js            # Lightweight browser-side simulator + UI interactions
├── render.yaml          # Render Blueprint for static deployment
└── README.md
```

---

## 🔬 How Monte Carlo π Estimation Works

The method uses random points in a square from `(-1, -1)` to `(1, 1)`:

1. Generate many random `(x, y)` points.
2. Check whether each point lies inside the unit circle (`x² + y² <= 1`).
3. Count how many points are inside the circle.
4. Estimate π with:

```text
π ≈ 4 × (points_inside_circle / total_points)
```

Why this works:
- Area of unit circle = `πr² = π` (because `r = 1`)
- Area of containing square = `2 × 2 = 4`
- So: `points_inside / total ≈ area_circle / area_square = π/4`

---

## ⚙️ Sequential vs Parallel Execution

### Sequential
- One thread processes all tosses from start to finish.
- Simple flow, but slower as toss count grows.

### Parallel
- Work is split among multiple threads.
- Each thread handles part of the tosses.
- Partial results are combined with OpenMP `reduction`.
- Usually faster for large workloads (depending on hardware and thread overhead).

---

## 🧵 What OpenMP Does in This Project

In `Calculate_Pi_Parallel`:
- `#pragma omp parallel` starts a team of threads.
- `#pragma omp for` divides toss iterations among threads.
- `reduction(+: no_in_circle)` safely combines each thread's count.

Why reduction matters:
- Without reduction, multiple threads updating the same counter can cause race conditions and incorrect totals.

---

## ✅ Prerequisites

- GCC with OpenMP support (commonly GCC 9+)
- Linux or macOS terminal

Check GCC:

```bash
gcc --version
```

---

## 🛠️ Build and Run (Linux/macOS)

From the repository root:

```bash
gcc -fopenmp monte_carlo_lab1.c -o monte_carlo
```

Run:

```bash
./monte_carlo
```

---

## 📌 Sample Expected Output

Actual timing varies by CPU and thread availability, but output is typically similar to:

```text
Timing sequential...
Took 0.82 seconds

Timing parallel...
Took 0.16 seconds

π = 3.1415925400 (sequential)
π = 3.1417268800 (parallel)
```

---

## 🎓 Learning Outcomes

By exploring this repository, beginners should be able to:

- Explain Monte Carlo simulation in plain language.
- Describe how random sampling can estimate π.
- Understand why parallelism can improve throughput.
- Recognize the role of OpenMP directives in shared-memory C programs.
- Compile and run a small C/OpenMP project end-to-end.

---

## 🌐 Static Educational Front Page

Open the learning portal locally by opening `index.html` in a browser, or deploy via Render using `render.yaml`.

The page includes:
- Concept explanations
- Sequential vs parallel comparison
- OpenMP walkthrough
- Local run instructions
- Interactive browser-side mini simulator

---


## 🧭 Render Preview Troubleshooting ("Not Found")

If Render preview shows **Not Found**, common causes are:
- Publish path does not include `index.html`.
- No rewrite rule for static routing.

This repo is configured to publish from the repo root and rewrite all routes to `index.html` in `render.yaml`.

---

## 🚀 Possible Future Improvements

- Make number of tosses configurable via command-line arguments.
- Compare speedup across different thread counts.
- Add charts for timing vs toss count.
- Add CI checks for build validation.
- Expand with additional Monte Carlo examples.

---

## 📄 License

No license file is currently included.

If you plan to share or reuse this project broadly, consider adding a license such as MIT, Apache-2.0, or GPL.
