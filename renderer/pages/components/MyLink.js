import { useRouter } from "next/router";
import { useEffect } from "react";
import React from "react";

const MyLink = props => {
  const router = useRouter();
  useEffect(() => {
    if (props.prefetch) router.prefetch(props.href);
  });

  const handleClick = e => {
    e.preventDefault();
    router.push(props.href);
  };

  return (
    <a href={props.href} onClick={handleClick}>
      {props.children}
    </a>
  );
};

export default MyLink;
