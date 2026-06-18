import Link from 'next/link';
import { MdSmartToy } from "react-icons/md";


export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[60vh] text-center px-4">
      <div className="mb-8">
        <span className="text-9xl text-primary"><MdSmartToy /></span>
      </div>
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Oops! Where did the toys go?</h2>
      <p className="text-base-content/70 mb-8 max-w-md">
        We searched under the bed and in the toy box, but we couldn&apos;t find the page you were looking for.
      </p>
      <Link href="/" className="btn btn-primary">
        Back to Playroom (Home)
      </Link>
    </div>
  );
}
