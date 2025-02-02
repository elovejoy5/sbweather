export const About = () => (
  <div style={{ margin: "1em" }}>
    <h1>About `sbweather`</h1>
    <p>
      `sbweather` is a prototype react app I tend to hack on when I'm job
      hunting.
    </p>
    <h2>Ingredients</h2>
    <table border={1}>
      <thead>
        <tr>
          <th>Ingredient</th>
          <th>Notes</th>
          <th>Link(s)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Cursor</td>
          <td>Much more like pairing than I thought it would be</td>
          <td>
            <div>
              <a href="https://www.cursor.com/">https://www.cursor.com/</a>
            </div>
            <div>
              <a href="https://cursor.directory/">https://cursor.directory/</a>
            </div>
          </td>
        </tr>
        <tr>
          <td>NWS API</td>
          <td>Forecast data</td>
          <td>
            <a href="https://www.weather.gov/documentation/services-web-api">
              APIs
            </a>
          </td>
        </tr>
        <tr>
          <td>MUI</td>
          <td>UI components</td>
          <td>
            <div>
              <a href="https://mui.com/">https://mui.com/</a>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <h2>Notes</h2>
    <p>2024</p>
    <ul>
      <li>suncalc for sun and moon times / phases</li>
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
