import React from "react";
import Image from "next/image";
import { TEAM_MEMBERS } from "../../lib/constants";
import { MdiLinkedin } from "../../components/assets/linkedInIcon";
import { MdiGithub } from "../../components/assets/githubIcon";

export default function About() {
  return (
    <main className="text-white p-8 md:w-10/12 lg:w-9/12 self-center flex flex-col gap-10">
      <h1 className="text-4xl font-bold mb-8 text-center">About Us</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {TEAM_MEMBERS.map((member) => (
          <div
            key={member.name}
            className="border-t-2 border-b-2 p-6 shadow-xl flex flex-col "
          >
            <Image
              className="rounded-full mx-auto mb-4 shadow shadow-white"
              width={150}
              height={150}
              src={member.imageUrl.src}
              alt={`${member.name}'s photo`}
            />
            <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
            <p className="text-xl mb-2">{member.role}</p>
            <p className="mb-10">{member.description}</p>
            <div className="flex justify-center space-x-4 mt-auto mb-0 ">
              <a
                href={member.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-125 transition"
              >
                <MdiLinkedin className="w-8 h-8" />
              </a>
              <a
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-125 transition"
              >
                <MdiGithub className="w-8 h-8" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
