import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import products from "../data/Products";

export default function Customize(){
  const { id } = useParams();
  const navigate = useNavigate();
  const baseProduct = products.find(p => p.id === parseInt(id));
  const [options, setOptions] = useState({
    size: 'M',
    color: 'Natural',
    finish: 'Matte',
    engraving: '',
    giftWrap: false
  });

  if (!baseProduct){
    return (
      <div className="container" style={{paddingTop:'2rem', paddingBottom:'2rem'}}>
        <p>Product not found.</p>
        <button className="btn btn-primary" onClick={() => navigate('/shop')}>Back to Shop</button>
      </div>
    );
  }

  const priceAddons = {
    size: { 'S': 0, 'M': 0, 'L': 5, 'XL': 8 },
    finish: { 'Matte': 0, 'Glossy': 3, 'Textured': 6 },
    color: { 'Natural': 0, 'Dark Brown': 2, 'Ivory': 2, 'Forest Green': 3 }
  };

  const sizeAdd = priceAddons.size[options.size] || 0;
  const finishAdd = priceAddons.finish[options.finish] || 0;
  const colorAdd = priceAddons.color[options.color] || 0;
  const engravingAdd = options.engraving?.length ? 4 : 0;
  const giftAdd = options.giftWrap ? 3 : 0;
  const totalPrice = baseProduct ? (baseProduct.price + sizeAdd + finishAdd + colorAdd + engravingAdd + giftAdd) : 0;

  const handleChange = (key, value) => setOptions(prev => ({...prev, [key]: value}));

  return (
    <div className="container" style={{paddingTop:'2rem', paddingBottom:'3rem'}}>
      <div style={{marginBottom:'1rem'}}>
        <Link to={`/shop/${baseProduct.id}`} className="breadcrumb-link">← Back to Product</Link>
      </div>
      <h1 style={{marginBottom:'0.25rem'}}>Customize: {baseProduct.name}</h1>
      <p style={{color:'#6c757d', marginBottom:'1.5rem'}}>Choose options and preview your made-to-order item.</p>

      <div style={{display:'grid', gridTemplateColumns:'1.2fr 1fr', gap:'2rem'}}>
        <div style={{background:'#fff', border:'1px solid #e9ecef', borderRadius:12, padding:'1rem'}}>
          <div style={{position:'relative', borderRadius:12, overflow:'hidden'}}>
            <img src={baseProduct.image} alt={baseProduct.name} style={{width:'100%', height:420, objectFit:'cover'}} />
            {/* Simple color overlay to simulate finish/color */}
            <div style={{position:'absolute', inset:0, mixBlendMode:'multiply', opacity: options.color==='Natural'?0:0.25, background: options.color==='Dark Brown'?'#3e2723': options.color==='Ivory'?'#f2efe6': options.color==='Forest Green'?'#1b5e20':'transparent'}} />
            <div style={{position:'absolute', bottom:10, right:10, background:'rgba(0,0,0,0.55)', color:'#fff', padding:'6px 10px', borderRadius:8, fontSize:12}}>
              {options.finish} • {options.color} • {options.size}
            </div>
            {options.engraving && (
              <div style={{position:'absolute', bottom:18, left:18, color:'#fff', background:'rgba(0,0,0,0.35)', padding:'6px 10px', borderRadius:8, fontWeight:600}}>
                {options.engraving}
              </div>
            )}
          </div>
        </div>

        <div style={{display:'flex', flexDirection:'column', gap:'1rem'}}>
          <div style={{background:'#fff', border:'1px solid #e9ecef', borderRadius:12, padding:'1rem'}}>
            <h3 style={{marginTop:0}}>Options</h3>
            <div className="mb-3">
              <label className="form-label">Size</label>
              <select className="form-control" value={options.size} onChange={(e)=>handleChange('size', e.target.value)}>
                <option>S</option>
                <option>M</option>
                <option>L</option>
                <option>XL</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Color</label>
              <select className="form-control" value={options.color} onChange={(e)=>handleChange('color', e.target.value)}>
                <option>Natural</option>
                <option>Dark Brown</option>
                <option>Ivory</option>
                <option>Forest Green</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Finish</label>
              <select className="form-control" value={options.finish} onChange={(e)=>handleChange('finish', e.target.value)}>
                <option>Matte</option>
                <option>Glossy</option>
                <option>Textured</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Engraving (optional)</label>
              <input className="form-control" placeholder="e.g., For Aisha" value={options.engraving} onChange={(e)=>handleChange('engraving', e.target.value)} />
            </div>
            <div className="mb-3" style={{display:'flex', alignItems:'center', gap:'0.6rem'}}>
              <input id="giftwrap" type="checkbox" checked={options.giftWrap} onChange={(e)=>handleChange('giftWrap', e.target.checked)} />
              <label htmlFor="giftwrap">Add gift wrap</label>
            </div>
          </div>
          <div style={{background:'#fff', border:'1px solid #e9ecef', borderRadius:12, padding:'1rem'}}>
            <h3 style={{marginTop:0}}>Summary</h3>
            <p style={{margin:'0 0 0.5rem 0'}}>Base price: ${baseProduct.price.toFixed(2)}</p>
            <p style={{margin:'0 0 0.5rem 0'}}>Estimated total: <strong>${totalPrice.toFixed(2)}</strong></p>
            <div style={{display:'flex', gap:'0.75rem', flexWrap:'wrap'}}>
              <button className="btn btn-primary">Add Customized Item to Cart</button>
              <Link className="btn btn-secondary" to={`/shop/${baseProduct.id}`}>Back to Product</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


