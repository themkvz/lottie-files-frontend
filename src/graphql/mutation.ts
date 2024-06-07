import { gql } from "@apollo/client";

export const DELETE_MUTATION = gql`
    mutation DeleteAnimation($id: MongoID!) {
        deleteAnimation(_id: $id) {
            recordId
        }
    }
`

export const UPLOAD_MUTATION = gql`
    mutation Upload($file: Upload!, $name: String) {
        uploadAnimation(file: $file, name: $name)  
    }
`