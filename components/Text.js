import React from "react";
import Image from "next/image";
import Link from "next/link";

const Text = () => {
  return (
    <section className="container mx-auto mt-20 md:px-12">
      <div className="bg-gray-100 px-5 md:px-10 rounded-3xl text-black flex flex-col md:flex-row items-center">
        <div className="flex-1 py-5">
          <h2 className="text-3xl font-sans font-extrabold mb-8">What is an IP Address?</h2>
          <p className="md:w-[90%] w-full text-xl font-thin mb-8 md:mb-4">
            An IP address (Internet Protocol address) is a unique identifier assigned to each device connected to a network. 
            It helps devices communicate and route data across the internet.
          </p>

          <Link 
            href="/free-tools/iplookup"
            className="inline-block bg-black text-white py-2 px-6 rounded-lg text-lg font-medium hover:bg-gray-800 transition-all duration-300"
          >
            Check my IP
          </Link>
        </div>

        <div className="w-full mx-auto hidden md:block md:w-1/3 mt-8 md:relative md:-mt-12">
          <Image
            src="/Frame19.webp"
            alt="Illustration of an IP address concept"
            width={500}
            height={400}
            className="rounded-lg object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Text;
