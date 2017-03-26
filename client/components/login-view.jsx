import styles from '../styles/login-view.less';

const LoginView = (props, { locale }) => {
  const { email, error, handleEmailChange, handlePasswordChange, onSubmit, password } = props;

  return (
    <div className='login-view'>
      <div className='login-view-container'>
        <h1 className='title'>Dear Dairy Login</h1>
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
            className='password'
            name='password'
            onChange={handlePasswordChange}
            placeholder='Password'
            tabIndex='1'
            type='password'
            value={password} />
          <button className='submit' tabIndex='3' type='submit'>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginView;
