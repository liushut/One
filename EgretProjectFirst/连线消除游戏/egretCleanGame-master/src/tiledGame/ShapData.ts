// ��״����
class EllipseShapData {//��Բ
    public pos:egret.Point;
    public ra:number = 0;//���뾶
    public rb:number = 0;//�̰뾶
}
class PolygonShapData {//�����
    public pos:egret.Point;
    public pointArray:Array<egret.Point> = [];
}
class PolyLineShapData {//����
    public pos:egret.Point;
    public pointArray:Array<egret.Point> = [];
}
class RectangleShapData {//����
    public pos:egret.Point;
    public width:number = 0;
    public height:number = 0;
}