import httpStatus from 'http-status'
import { Request, Response, NextFunction } from 'express'
import { IBaseModel} from '../model/base.model'
// import respLayer from '../responseLayer/sqlite.layer'
import { Add, Get, List, Update, Del } from '../responseLayer/sqlite.layer'
import { IResp, BaseResp } from '../responseLayer/base.layer'


interface IBaseController {
  model: IBaseModel
  add(req: Request, res: Response, next: NextFunction): void
  list(req: Request, res: Response, next: NextFunction): void
  get(req: Request, res: Response, next: NextFunction): void
  update(req: Request, res: Response, next: NextFunction): void
  del(req: Request, res: Response, next: NextFunction): void
}

class BaseController implements IBaseController {
  model: IBaseModel
  respLayer: IResp
  addLayer: Add
  getLayer: Get
  listLayer: List
  updateLayer: Update
  delLayer: Del
  constructor(model: IBaseModel) {
    this.model = model
    this.respLayer = new BaseResp()
    this.addLayer = new Add()
    this.getLayer = new Get()
    this.listLayer = new List()
    this.updateLayer = new Update()
    this.delLayer = new Del()
  }
  
  async add(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.model.add(req)
      this.respLayer = this.addLayer
      const resp = this.respLayer.resp(data)
      res.status(httpStatus.OK).json(resp)
    } catch(e) {
      next(e)
    }

  }
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.model.list(req)
      this.respLayer = this.listLayer
      const resp = this.respLayer.resp(data)
      res.status(httpStatus.OK).json(resp)
    } catch(e) {
      next(e)
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.model.get(req)
      this.respLayer = this.getLayer
      const resp = this.respLayer.resp(data)
      res.status(httpStatus.OK).json(resp)
    } catch(e) {
      next(e)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.model.update(req)
      this.respLayer = this.updateLayer
      const resp = this.respLayer.resp(data)
      console.log('item controller', data)
      res.status(httpStatus.OK).json(resp)
    } catch(e) {
      console.log('item controller eee', e)

      next(e)
    }
  }

  async del(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.model.del(req)
      this.respLayer = this.delLayer
      const resp = this.respLayer.resp(data)

      res.status(httpStatus.OK).json(resp)
    } catch(e) {
      next(e)
    }
  }

}

export { IBaseController, BaseController }

