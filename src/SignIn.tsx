type Props = {
  toggleSignIn: React.MouseEventHandler<HTMLButtonElement>
};

function SignIn({ toggleSignIn } : Props) {
  return (
    <>
      <div>
        <p>Sign-in button</p>
        <button onClick={ toggleSignIn }></button>
      </div>
    </>
  );
};

export default SignIn
