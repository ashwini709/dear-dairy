import styles from '../styles/login-view.less';

const SignupView = (props, { locale }) => {
  const { email, error, handleEmailChange, handlePasswordChange, handleRepasswordChange, handleUsernameChange, onSubmit, password, repassword, username } = props;

  return (
    <div className='login-view'>
      <div className='login-view-container'>
        <h1 className='title'>Dear Dairy Signup</h1>
        <form className='login-form' onSubmit={onSubmit}>
          <input
            className='email'
            name='email'
            onChange={handleEmailChange}
            placeholder='Email'
            tabIndex='1'
            type='name'
            value={email} />
          <input
            className='username'
            name='username'
            onChange={handleUsernameChange}
            placeholder='Username'
            tabIndex='1'
            type='name'
            value={username} />
          <input
            className='password'
            name='password'
            onChange={handlePasswordChange}
            placeholder='Password'
            tabIndex='1'
            type='password'
            value={password} />
          <input
            className='password'
            name='password'
            onChange={handleRepasswordChange}
            placeholder='Re-enter Password'
            tabIndex='1'
            type='password'
            value={repassword} />
          <button className='submit' tabIndex='3' type='submit'>
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupView;
