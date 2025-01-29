export const About = () => (
  <div style={{ margin: "1em" }}>
    <h1>About `sbweather`</h1>
    <p>
      `sbweather` is a prototype react app I tend to hack on when I'm job
      hunting.
    </p>
    <p>
      Many thanks to the NWS for their fun{" "}
      <a href="https://www.weather.gov/documentation/services-web-api">APIs</a>.
    </p>
    <p>2024</p>
    <ul>
      <li>Playing with cursor. Nice to have an AI to pair with!</li>
      <li>Updated dependencies to latest</li>
    </ul>
    <p>2023</p>
    <ul>
      <li>
        AWS lambda and S3 to cache forecasts so web app can reliably poll them.
        Terraform!{" "}
        <a href="https://github.com/elovejoy5/sbweather-server/commits/main/">
          https://github.com/elovejoy5/sbweather-server/commits/main/
        </a>
      </li>
      <li>react-query to cache state in web app </li>
    </ul>
    <p>2022</p>
    <ul>
      <li>first pass tries to poll NWS API from browser</li>
      <li>create-react-app, Typescript, testing-library, MUI, react-router</li>
      <li>
        github actions to deploy to{" "}
        <a href="https://elovejoy5.github.io/sbweather/">
          https://elovejoy5.github.io/sbweather/
        </a>
      </li>
    </ul>
    <p>
      Since I'm often curious about the weather here, maybe I'll keep at it and
      it will become more than a code sample.
    </p>
    <p>
      Browse on GitHub at{" "}
      <a href="https://github.com/elovejoy5/sbweather">
        https://github.com/elovejoy5/sbweather
      </a>
    </p>
  </div>
);
