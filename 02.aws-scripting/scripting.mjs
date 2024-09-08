import fs from "fs"
import AWS from "aws-sdk"

// configure aws sdk
AWS.config.update({ region: 'us-east-1' }) // your region

// create service object
const iam = new AWS.IAM()

async function list_users_and_groups() {
    try {
        // listing users
        const usersResponse = await iam.listUsers().promise()
        const users = usersResponse.Users.map(user => user.UserName).join('\n')

        // list groups groups
        const groupsResponse = await iam.listGroups().promise()
        const groups = groupsResponse.Groups.map(group => group.GroupName).join('\n')

        // write results
        const output = `users:\n${users}\n\ngroups:\n${groups}`
        fs.writeFileSync('output.txt', output)

        console.log('saved to output.txt')
    } catch (error) {
        console.error(error)
    }
}

list_users_and_groups()