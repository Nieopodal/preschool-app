import { Response } from 'express';
import { User } from '../user/entity/user.entity';

export const pageRenderHandler = (
  res: Response,
  user: User | true,
  viewPath: string,
  firstPropObj?: { [key: string]: any },
  secPropObj?: { [key: string]: any },
) => {
  const userLoggedIn = user instanceof User;

  if (!firstPropObj) {
    return res.render(viewPath, {
      layout: 'index',
      userLoggedIn,
    });
  }

  if (!secPropObj) {
    const firstHbsVariableName = Object.keys(firstPropObj)[0];
    const firstHbsVariableValue = Object.values(firstPropObj)[0];

    return res.render(viewPath, {
      layout: 'index',
      userLoggedIn,
      [firstHbsVariableName]: firstHbsVariableValue,
    });
  }

  const firstHbsVariableName = Object.keys(firstPropObj)[0];
  const firstHbsVariableValue = Object.values(firstPropObj)[0];

  const secondHbsVariableName = Object.keys(secPropObj)[0];
  const secondHbsVariableValue = Object.values(secPropObj)[0];

  return res.render(viewPath, {
    layout: 'index',
    userLoggedIn,
    [firstHbsVariableName]: firstHbsVariableValue,
    [secondHbsVariableName]: secondHbsVariableValue,
  });
};
