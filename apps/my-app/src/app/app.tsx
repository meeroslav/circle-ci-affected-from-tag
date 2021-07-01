import styles from './app.module.css';

import { ReactComponent as Logo } from './logo.svg';
import star from './star.svg';

export function App() {
  return (
    <div className={styles.app}>
      <header className="flex">
        <Logo width="75" height="75" />
        <h1>Welcome to my-app!</h1>
      </header>
      <main>
        {star} is born a {star}!
        Another change
      </main>
    </div>
  );
}

export default App;
