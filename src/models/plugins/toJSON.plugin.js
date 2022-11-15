/* eslint-disable no-param-reassign */

/**
 * A mongoose schema plugin which applies the following in the toJSON transform call:
 *  - removes __v, createdAt, updatedAt, and any path that has private: true
 *  - replaces _id with id
 */

/* const deleteAtPath = (obj, path, index) => {
  if (index === path.length - 1) {
    delete obj[path[index]];
    return;
  }
  deleteAtPath(obj[path[index]], path, index + 1);
}; */

const toJSON = function () {
  let values = this.get();
  values = Object.keys(values).reduce((acc, key) => {
    if (key !== '__v' && key !== 'createdAt' && key !== 'updatedAt' && !values[key].private) {
      acc[key] = values[key];
    }
    return acc;
  }, {});
  delete values.password;
  return values;
};

//   console.log(this.get());
//   let transform;
//   if (schema.options.toJSON && schema.options.toJSON.transform) {
//     transform = schema.options.toJSON.transform;
//   }

//   schema.options.toJSON = Object.assign(schema.options.toJSON || {}, {
//     transform(doc, ret, options) {
//       Object.keys(schema.paths).forEach((path) => {
//         if (schema.paths[path].options && schema.paths[path].options.private) {
//           deleteAtPath(ret, path.split('.'), 0);
//         }
//       });

//       ret.id = ret._id.toString();
//       delete ret._id;
//       delete ret.__v;
//       delete ret.createdAt;
//       delete ret.updatedAt;
//       if (transform) {
//         return transform(doc, ret, options);
//       }
//     },
//   });
// };

module.exports = toJSON;
