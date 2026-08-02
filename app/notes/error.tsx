"use client";

export default function ErrorPage({ error }: { error: Error }) {
  return <p>Could not fetch notes. {error.message}</p>;
}
