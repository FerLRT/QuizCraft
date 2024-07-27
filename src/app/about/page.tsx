import React from "react";
import Image from "next/image";
import { TEAM_MEMBERS } from "../../lib/constants";
import { MdiLinkedin } from "../../components/assets/linkedInIcon";
import { MdiGithub } from "../../components/assets/githubIcon";

export default function About() {
  return (
    <main className="bg-gray-900 text-white min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">About Us</h1>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.name}
              className="bg-gray-800 p-6 rounded-lg flex flex-col"
            >
              <Image
                className="rounded-full mx-auto mb-4"
                width={150}
                height={150}
                src={member.imageUrl.src}
                alt={`${member.name}'s photo`}
              />
              <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
              <p className="text-xl mb-2">{member.role}</p>
              <p>{member.description}</p>
              <div className="flex justify-center space-x-4 mt-auto mb-0 ">
                <a
                  href={member.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MdiLinkedin className="w-6 h-6" />
                </a>
                <a href={member.github} target="_blank">
                  <MdiGithub className="w-6 h-6" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">Who are we?</h2>
        <p>
          We are a team of passionate and innovative computer engineers, all
          graduates from the University of Castilla-La Mancha. Our journey began
          four years ago as university classmates, where we discovered our
          shared enthusiasm for technology and continuous learning.
        </p>
        <p>
          Over the past four years, we have participated in various hackathons,
          both together and individually, including the HPe CDS Tech Challenge,
          Telefónica&apos;s HackForGood and Entrepreneur. These experiences have
          not only honed our teamwork skills but also enhanced our technical
          abilities, inspiring us to join this hackathon.
        </p>
        <p>
          Our diverse experiences and collaborative spirit drive us to tackle
          challenges with creativity and dedication. We believe in the power of
          technology to solve real-world problems and are committed to
          leveraging our skills to create impactful solutions.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">
          Objectives and Purpose of the Application
        </h2>
        <p>
          Our primary objective is to simplify the process of creating
          educational tests from existing documents. We aim to make learning
          more accessible and efficient for both educators and students by
          providing a tool that automates the generation of test questions.
        </p>
        <p>This application serves two main purposes:</p>
        <ul className="list-disc list-inside ml-4 space-y-2">
          <li>
            <strong>For Educators</strong>: It helps in automatically generating
            questions from their existing documents, saving valuable time in
            preparing assessments and enabling the creation of customized
            educational materials.
          </li>
          <li>
            <strong>For Students</strong>: It assists in generating practice
            tests from their notes, improving their exam preparation and
            reinforcing their understanding of study materials.
          </li>
        </ul>
        <p>
          This project stems from our own experiences as students. Having
          recently completed our degrees in Computer Engineering and about to
          start a Master&apos;s in Strategic IT Management, we understand the
          challenges faced by both educators and students in the educational
          sphere. Our application is designed to address these challenges,
          offering a practical solution to enhance the learning and teaching
          experience.
        </p>
        <p>
          By leveraging our technical expertise and passion for education, we
          are committed to developing a tool that not only saves time but also
          enriches the educational process. We believe that through technology,
          we can create a more interactive and effective learning environment
          for everyone.
        </p>
      </section>
    </main>
  );
}
