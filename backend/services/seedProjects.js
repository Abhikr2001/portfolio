import Project from "../models/Project.js";

export const seedProjects = async () => {
  const count = await Project.countDocuments();

  if (count === 0) {
    await Project.insertMany([
      {
        title: "YouTube Clone",
        description:
          "A YouTube clone built using React, Tailwind CSS and YouTube Data API v3.",
        techStack: ["React", "JavaScript", "Tailwind CSS"],
        github: "https://github.com/Abhikr2001/youtube-clone",
        demo: "#",
        imageUrl: "/uploads/projects/youtube.png",
      },
      {
        title: "Spotify Clone",
        description:
          "Spotify UI clone with music playback functionality built using React.",
        techStack: ["React", "JavaScript", "CSS"],
        github: "https://github.com/Abhikr2001/spotify-clone",
        demo: "#",
        imageUrl: "/uploads/projects/spotify.png",
      },
      {
        title: "News App",
        description:
          "A news application that fetches real-time news using News API.",
        techStack: ["React", "JavaScript", "News API"],
        github: "https://github.com/Abhikr2001/news-app",
        demo: "#",
        imageUrl: "/uploads/projects/news.png",
      },
    ]);

    console.log("Default projects inserted");
  }
};