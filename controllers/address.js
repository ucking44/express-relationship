const Address = require('../model/address')

async function createAddress(req, res) 
{
    try 
    {
        const { address, userId } = req.body
        const newAddress = Address.build({
            address: address,
            userId: userId
        })

        const saveAddress = await newAddress.save()
        res.status(201).json({
            success: true,
            message: 'Address Was Created successfully!',
            data: saveAddress
        })
    } 
    catch (error) 
    {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Ooopsss! Something Went Wrong!'
        })
    }    
}

module.exports = {
    createAddress
}

