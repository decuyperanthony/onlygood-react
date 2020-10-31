const messagaController = {
    messageHomePage: async (req, res) => {
        try {
            res.render('message')
        } catch (error) {
            console.trace(error);
            res.status(500).render("500");
        }
    }
};

module.exports = messagaController;