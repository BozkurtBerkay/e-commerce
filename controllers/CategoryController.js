const Category = require('../models/CategoryModel')
const Products = require('../models/ProductModel')

const CategoryController = {
    getCategories: async(req, res) =>{
        try {
            const categories = await Category.find()
            res.json(categories)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createCategory: async (req, res) =>{
        try {
            // kullanıcı rolü = 1 ---> admin
            // sadece admin CRUD operasyonları yapabilir
            const {name} = req.body;
            const category = await Category.findOne({name})
            if(category) return res.status(400).json({msg: "Kategori Kullanılıyor..."})

            const newCategory = new Category({name})

            await newCategory.save()
            res.json({msg: "Kategori Oluşturuldu..."})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteCategory: async(req, res) =>{
        try {
            const products = await Products.findOne({category: req.params.id})
            if(products) return res.status(400).json({
                msg: "İlişkisi olan tüm ürünleri silin."
            })

            await Category.findByIdAndDelete(req.params.id)
            res.json({msg: "Kategori Silindi..."})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateCategory: async(req, res) =>{
        try {
            const {name} = req.body;
            await Category.findOneAndUpdate({_id: req.params.id}, {name})

            res.json({msg: "Kategori Güncellendi..."})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}


module.exports = CategoryController