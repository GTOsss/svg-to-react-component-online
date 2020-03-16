const html = ({
  children,
  style,
}) => `<!DOCTYPE html>
<html lang="en">
<head>
 <meta charset="UTF-8">
 <title>Demo</title>
 ${style}
</head>
<body>
 <div class="wrap">
  ${children}
 </div>
</body>
</html>
`;

const style = ({
  backgroundColorScreen = '#f4f4f4',
}) => `<style type="text/css">
  html, body {
   margin: 0;
   padding: 0;
  }

  .wrap {
    padding: 40px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
  }

  .name {
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    overflow-y: auto;
  }

  .item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
    background-color: #f4f4f4;
    border: 1px solid #e1e1e1;
    width: calc(20% - 30px);
    height: 250px;
    margin: 4px;
  }

  .screen {
    height: 200px;
    width: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${backgroundColorScreen}
  }

  .wrap-svg {
    min-width: 50px;
    min-height: 50px;
  }

  svg {
    max-width: 100%;
    max-height: 100px;
  }
 </style>`;

const element = ({
  name,
  svg,
}) => ` <div class="item">
  <div class="name">
    ${name}
  </div>
  <div class="screen">
   <div class="wrap-svg">
    ${svg}
   </div>
  </div>
 </div>`;

module.exports = {
  html,
  style,
  element,
};
