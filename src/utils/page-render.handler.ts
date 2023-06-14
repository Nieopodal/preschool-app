import { Response } from 'express';

export const pageRenderHandler = (
  res: Response,
  isLoggedIn: boolean,
  viewPath: string,
  firstProp: { [key: string]: any },
  secProp: { [key: string]: any },
) => {
  if (!firstProp) {
    res.render(viewPath, {
      layout: 'index',
      userLoggedIn: isLoggedIn,
    });
    return;
  }

  if (!secProp) {
    const firstHbsVariableName = Object.keys(firstProp)[0];
    const firstHbsVariableValue = Object.values(firstProp)[0];

    res.render(viewPath, {
      layout: 'index',
      userLoggedIn: isLoggedIn,
      [firstHbsVariableName]: firstHbsVariableValue,
    });
    return;
  }

  const firstHbsVariableName = Object.keys(firstProp)[0];
  const firstHbsVariableValue = Object.values(firstProp)[0];

  const secondHbsVariableName = Object.keys(secProp)[0];
  const secondHbsVariableValue = Object.values(secProp)[0];

  res.render(viewPath, {
    layout: 'index',
    userLoggedIn: isLoggedIn,
    [firstHbsVariableName]: firstHbsVariableValue,
    [secondHbsVariableName]: secondHbsVariableValue,
  });
};
