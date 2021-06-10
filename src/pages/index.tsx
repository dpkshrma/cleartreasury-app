import Head from "next/head";
import Image from "next/image";

export const Home = (): JSX.Element => (
  <div className="min-h-screen px-2 flex flex-col justify-center items-center">
    <Head>
      <title>Create Next App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className="py-20 flex flex-1 flex-col justify-center items-center">
      <h1 className="font-bold m-0 text-6xl leading-tight text-center">
        Welcome to{" "}
        <a className="text-blue-600" href="https://nextjs.org">
          Next.js!
        </a>
      </h1>

      <p className="text-2xl text-center leading-normal my-6">
        Get started by editing{" "}
        <code className="bg-gray-100 rounded-md p-3 text-lg font-mono">
          pages/index.tsx
        </code>
      </p>

      <button
        className="bg-gray-200 px-1.5 py-px border border-solid border-gray-600 rounded-sm hover:bg-gray-300"
        onClick={() => {
          window.alert("With typescript and Jest");
        }}
      >
        Test Button
      </button>

      <div className="mt-12 flex flex-col sm:flex-row flex-wrap justify-center items-center">
        <a
          href="https://nextjs.org/docs"
          className="m-4 p-6 border block rounded-lg transition-colors ease-linear hover:text-blue-600 hover:border-blue-600"
          style={{ width: "45%" }}
        >
          <h3 className="font-bold mb-4 text-2xl">Documentation &rarr;</h3>
          <p className="m-0 text-xl leading-6">
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <a
          href="https://nextjs.org/learn"
          className="m-4 p-6 border block rounded-lg transition-colors ease-linear hover:text-blue-600 hover:border-blue-600"
          style={{ width: "45%" }}
        >
          <h3 className="font-bold mb-4 text-2xl">Learn &rarr;</h3>
          <p className="m-0 text-xl leading-6">
            Learn about Next.js in an interactive course with quizzes!
          </p>
        </a>

        <a
          href="https://github.com/vercel/next.js/tree/master/examples"
          className="m-4 p-6 border block rounded-lg transition-colors ease-linear hover:text-blue-600 hover:border-blue-600"
          style={{ width: "45%" }}
        >
          <h3 className="font-bold mb-4 text-2xl">Examples &rarr;</h3>
          <p className="m-0 text-xl leading-6">
            Discover and deploy boilerplate example Next.js projects.
          </p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          className="m-4 p-6 border block rounded-lg transition-colors ease-linear hover:text-blue-600 hover:border-blue-600"
          style={{ width: "45%" }}
        >
          <h3 className="font-bold mb-4 text-2xl">Deploy &rarr;</h3>
          <p className="m-0 text-xl leading-6">
            Instantly deploy your Next.js site to a public URL with Vercel.
          </p>
        </a>
      </div>
    </main>

    <footer className="w-full h-24 border-t border-solid border-gray-200 flex justify-center items-center">
      <a
        className="flex justify-center items-center"
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by{" "}
        <Image
          className="ml-2"
          src="/vercel.svg"
          alt="Vercel Logo"
          height={"32"}
          width={"64"}
        />
      </a>
    </footer>
  </div>
);

export default Home;
