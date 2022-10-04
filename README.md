[![Правильный CSS!](https://jigsaw.w3.org/css-validator/images/vcss-blue)](https://jigsaw.w3.org/css-validator/check/referer)


# Car leasing calculator
### Description:
[https://doc.clickup.com/2659433/p/h/2h539-67321/1cdca9cd67897c8](https://doc.clickup.com/2659433/p/h/2h539-67321/1cdca9cd67897c8)

### Demo on GitHub Pages:
[https://kirillmarkeyev.github.io/oxem-test-assignment/](https://kirillmarkeyev.github.io/oxem-test-assignment/)

### Local usage:
```
# Clone the repo
git clone git@github.com:kirillmarkeyev/oxem-test-assignment.git
cd oxem-test-assignment

# Install dependencies
make install

# Start local server
make start
```
Then open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Easy example of the button with a spinner inside while loading (React-Bootstrap required)
``` 
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import { Spinner } from 'react-bootstrap';

function App() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      {isLoading ? (
        <button
        onClick={() => setIsLoading(!isLoading)}
        className="btn-main"
      >
        <Spinner animation="border" variant="light" />
      </button>
      ) : (
        <button
        onClick={() => setIsLoading(!isLoading)}
        className="btn-main"
      >
        Оставить заявку
      </button>
      )}
      
    </div>
  );
}

export default App;
```
