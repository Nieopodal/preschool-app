import { Response } from 'express';
import { User } from '../user/entity/user.entity';

export const pageRenderHandler = (
  res: Response,
  user: User | undefined,
  viewPath: string,
  firstPropObj?: { [key: string]: any },
  secPropObj?: { [key: string]: any },
) => {
  if (!firstPropObj) {
    return res.render(viewPath, {
      layout: 'index',
      userLoggedIn: user,
    });
  }

  if (!secPropObj) {
    const firstHbsVariableName = Object.keys(firstPropObj)[0];
    const firstHbsVariableValue = Object.values(firstPropObj)[0];

    return res.render(viewPath, {
      layout: 'index',
      userLoggedIn: user,
      [firstHbsVariableName]: firstHbsVariableValue,
    });
  }

  const firstHbsVariableName = Object.keys(firstPropObj)[0];
  const firstHbsVariableValue = Object.values(firstPropObj)[0];

  const secondHbsVariableName = Object.keys(secPropObj)[0];
  const secondHbsVariableValue = Object.values(secPropObj)[0];

  return res.render(viewPath, {
    layout: 'index',
    userLoggedIn: user,
    [firstHbsVariableName]: firstHbsVariableValue,
    [secondHbsVariableName]: secondHbsVariableValue,
  });
};
