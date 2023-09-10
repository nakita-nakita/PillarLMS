/**
 * The functions responsible for validating the user type. To find additional validation for the user check auth_validation.
 * @module user_validation
 */

module.exports = (db) => {
  /**
   * Is this user already assigned the permission.
   * @param {Object} userPermissionIdObject - {userId, permissionId}
   * @returns {boolean}
   * @example 
   *  await userValidation.doesUserHavePermission({
   *    userId,
   *    permissionId,
   *  })
   */
  const doesUserHavePermission = ({ permissionId, userId }) => {
    return new Promise(async (resolve, reject) => {
      const userWithPermission = await db.userManyPermission.findOne({
        where: {
          permissionId,
          userId,
          isDeleted: false
        },
      });

      resolve({result: userWithPermission !== null})

    })
  }

  /**
   * Is this user already assigned the permission.
   * @param {Object} userRoleIdObject - {userId, roleId}
   * @returns {boolean}
   * @example 
   *  await userValidation.doesUserHaveRole({
   *    userId,
   *    roleId,
   *  })
   */
  const doesUserHaveRole = ({ roleId, userId }) => {
    return new Promise(async (resolve, reject) => {
      const userWithRole = await db.userManyRole.findOne({
        where: {
          roleId,
          userId,
          isDeleted: false
        },
      });

      resolve({result:userWithRole !== null})

    })
  }

  return {
    doesUserHavePermission,
    doesUserHaveRole,
  }
}