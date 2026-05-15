"use server";

import fs from "fs/promises";
import path from "path";

const PROJECTS_PATH = path.join(process.cwd(), "src/data/projects.json");

export async function updateProjects(projects: any[]) {
  try {
    await fs.writeFile(PROJECTS_PATH, JSON.stringify(projects, null, 2));
    return { success: true };
  } catch (error) {
    console.error("Failed to update projects:", error);
    return { success: false, error: "Failed to save changes" };
  }
}
