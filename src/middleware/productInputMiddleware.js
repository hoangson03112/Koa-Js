const yup = require('yup');

async function productInputMiddlewareCreate(ctx, next) {
  try {
    const postData = ctx.request.body;
    let schema = yup.object().shape({
        id: yup.number().positive().integer(),
        name: yup.string().required(),
        price: yup.number().positive().required(),
        description:yup.string().required(),
        color:yup.string().required(),
        createdAt:yup.date(),
        image: yup.string().required()
    });

    await schema.validate(postData);
    next();
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      errors: e.errors,
      errorName: e.name
    }
  }

}

async function productInputMiddlewareUpdate(ctx, next) {
  try {
    const postData = ctx.request.body;
    let schema = yup.object().shape({
        id: yup.number().positive().integer(),
        name: yup.string().required(),
        price: yup.number().positive().required(),
        description:yup.string().required(),
        color:yup.string().required(),
        createdAt:yup.date().required(),
        image: yup.string().required()
    });

    await schema.validate(postData);
    next();
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      errors: e.errors,
      errorName: e.name
    }
  }

}

module.exports = {productInputMiddlewareCreate,productInputMiddlewareUpdate};
