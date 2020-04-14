using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Angular.API.DTOs
{
    public class GroupDTO
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public decimal Price { get; set; }

        [Range(5, 1000)]
        public int Quantity { get; set; }

        public DateTime InitialDate { get; set; }

        public DateTime EndDate { get; set; }
    }
}
