import './my-lib.module.css';

/* eslint-disable-next-line */
export interface MyLibProps {}

export function MyLib(props: MyLibProps) {
  return (
    <div>
      <h1>Welcome to my-lib!</h1>
      <p>This is where we lift off. I am changed now</p>
    </div>
  );
}

export default MyLib;
