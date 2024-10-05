// src/App.js
import generateDocuments from "../service/generateDocument.js"
import uploadDocuments from "../service/uploadDocument.js"

function UploadDoc() {
    const handleUpload = async () => {
        const documents = generateDocuments()
        await uploadDocuments(documents)
    }

    return (
        <div>
            <h1>Upload Transactions</h1>
            <button onClick={handleUpload}>
                Generate and Upload Documents
            </button>
        </div>
    )
}

export default UploadDoc
