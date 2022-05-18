using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductsSupermarket.Core.Product
{
    public class Product
    {
        [Key]
        public int Id { get; set; }

        [Required, MaxLength(100)]
        public string Name { get; set; }
        
        [Required]
        public string Description { get; set; }

        [Required]
        public string Image { get; set; }

        [Required]
        public double Precio { get; set; }

        [Required]
        public int BrandId { get; set; }

        [Required]
        public int CategorysId { get; set; }
    }
}
