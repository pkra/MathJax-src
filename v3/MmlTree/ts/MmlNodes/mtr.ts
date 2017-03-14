import {PropertyList, ANode} from '../Node';
import {AMmlNode, MmlNode, AttributeList} from '../MmlNode';
import {INHERIT} from '../Attributes';

export class MmlMtr extends AMmlNode {
    static defaults: PropertyList = {
        ...AMmlNode.defaults,
        rowalign: INHERIT,
        columnalign: INHERIT,
        groupalign: INHERIT
    };

    get kind() {return 'mtr'}
    get linebreakContainer() {return true}
    //
    // FIXME: Should be in MathML input jax, not here
    //
    appendChild(child: MmlNode) {
        if (!child.isKind('mtd')) {
            child = this.factory.create('mtd', child);
        }
        return super.appendChild(child);
    }

    protected setChildInheritedAttributes(attributes: AttributeList, display: boolean, level: number, prime: boolean) {
        attributes = this.addInheritedAttributes(attributes, this.attributes.getAllAttributes());
        super.setChildInheritedAttributes(attributes, display, level, prime);
    }

    setTeXclass(prev: AMmlNode) {
        this.getPrevClass(prev);
        for (const child of (this.childNodes as AMmlNode[])) {
            child.setTeXclass(null);
        }
        if (this.isEmbellished) {
            this.updateTeXclass(this.core() as AMmlNode);
        }
        return this;
    }
}

export class MmlMlabeledtr extends MmlMtr {
    get kind() {return 'mlabeledtr'}
    get arity() {return 1}
}
