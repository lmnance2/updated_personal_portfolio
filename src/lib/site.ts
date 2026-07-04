/**
 * Single-source constants. Tweak this file to update contact handles, the
 * GitHub username used by the live-stats Route Handler, etc.
 */

export const SITE = {
  name: "Liam Nance",
  email: "liamnance06@gmail.com",
  /**
   * If Liam's real GitHub handle differs from this placeholder, change the
   * value below. The /api/github Route Handler reads it.
   */
  github: "lmnance2",
  githubUrl: "https://github.com/lmnance2",
  linkedin: "linkedin.com/in/liam-nance-a17152316",
  linkedinUrl: "https://www.linkedin.com/in/liam-nance-a17152316/",
  location: "Champaign, IL",
  expectedGrad: "May 2028",
  school: "University of Illinois Urbana-Champaign",
  major: "B.S. Computer Science, Minor in Business",
  gpa: "3.90",
} as const;
