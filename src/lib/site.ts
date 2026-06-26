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
  github: "liamnance",
  githubUrl: "https://github.com/liamnance",
  linkedin: "linkedin.com/in/liam-nance",
  linkedinUrl: "https://linkedin.com/in/liam-nance",
  location: "Champaign, IL",
  expectedGrad: "May 2028",
  school: "University of Illinois Urbana-Champaign",
  major: "B.S. Computer Science, Minor in Business",
  gpa: "3.90",
} as const;
