import express from 'express'
import { DocumentRepository } from '../../infrastructure/database/repositories/documentRepository'
import { CreateDocumentUseCase } from '../../application/use-cases/document/createDocumentUseCase'
import { GetDocumentByUserUseCase } from '../../application/use-cases/document/getDocumentByUserUseCase'
import { GetDocumentByIdUseCase } from '../../application/use-cases/document/getDocumentByIdUseCase'
import { UpdateDocumentContentUseCase } from '../../application/use-cases/document/updateDocumentContentUseCase'
import { DocumentController } from '../controllers/document.controller'
import { authMiddleware } from '../middleware/authMiddleware'

const router=express.Router()

const documentRepository = new DocumentRepository()
const createDocumentUseCase= new CreateDocumentUseCase(documentRepository)
const getDocumentByUserUseCase = new GetDocumentByUserUseCase(documentRepository)
const getDocumentByIdUseCase = new GetDocumentByIdUseCase(documentRepository)
const updateDocumentContentUseCase = new UpdateDocumentContentUseCase(documentRepository)

const documentController = new DocumentController(
    createDocumentUseCase,
    getDocumentByUserUseCase,
    getDocumentByIdUseCase,
    updateDocumentContentUseCase
)

router.post('/create',authMiddleware,(req,res,next)=>documentController.createDocument(req, res, next))
router.get('/',authMiddleware,(req, res, next)=>documentController.listDocuments(req, res, next))
router.get('/:documentId',authMiddleware,(req, res, next)=>documentController.getDocument(req, res, next))
router.put('/:documentId',authMiddleware,(req, res, next)=>documentController.updateContent(req, res, next))

export default router